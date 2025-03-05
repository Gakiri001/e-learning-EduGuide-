const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const StudentCourses = require("../../models/StudentCourses");
const Course = require("../../models/Course");

const createOrder = async (req, res) => {
  try {
    const {
      userID,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentID,
      payerID,
      instructorID,
      instructorName,
      CourseImage,
      CourseTitle,
      courseID,
      coursePricing,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: CourseTitle,
                sku: courseID,
                price: coursePricing,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coursePricing.toFixed(2),
          },
          description: CourseTitle,
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentinfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error creating paypal payment!",
        });
      } else {
        const newlyCreatedCourseOrder = new Order({
          userID,
          userName,
          userEmail,
          orderStatus,
          paymentMethod,
          paymentStatus,
          orderDate,
          paymentID,
          payerID,
          instructorID,
          instructorName,
          CourseImage,
          CourseTitle,
          courseID,
          coursePricing,
        });
        await newlyCreatedCourseOrder.save();

        const approvalURL = paymentinfo.links?.find(
          (link) => link.rel === "approval_url",
        )?.href;

        res.status(201).json({
          success: true,
          data: {
            approvalURL,
            orderID: newlyCreatedCourseOrder._id,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};

const capturePaymentAndFinanlizeOrder = async (req, res) => {
  try {
    const { paymentID, payerID, orderID } = req.body;
    let order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `order can't be found`,
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentID = paymentID;
    order.payerID = payerID;

    await order.save();

    //Update student Course model
    const studentCourses = await StudentCourses.findOne({
      userID: order.userID,
    });
    if (studentCourses) {
      studentCourses.courses.push({
        courseID: order.courseID,
        title: order.CourseTitle,
        instructorID: order.instructorID,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });
      await studentCourses.save();
    } else {
      const newstudentCourse = new StudentCourses({
        userID: order.userID,
        courses: [
          {
            courseID: order.courseID,
            title: order.CourseTitle,
            instructorID: order.instructorID,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });
      await newstudentCourse.save();
    }

    //update the course schema student
    await Course.findByIdAndUpdate(order.courseID, {
      $addToSet: {
        student: {
          studentID: order.userID,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "order Confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};

module.exports = { createOrder, capturePaymentAndFinanlizeOrder };
