import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/Context/intructor-context";
import { mediaUploadService } from "@/services";
import React, { useContext } from "react";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let copycourseCurriculumFormData = [...courseCurriculumFormData];
    copycourseCurriculumFormData[currentIndex] = {
      ...copycourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(copycourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    console.log("handleFreePreviewChange", currentIndex, currentValue);
    let copycourseCurriculumFormData = [...courseCurriculumFormData];
    copycourseCurriculumFormData[currentIndex] = {
      ...copycourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(copycourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    console.log("upload", event.target.files);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        console.log("response", response);
        if (response.success) {
          let copycourseCurriculumFormData = [...courseCurriculumFormData];
          copycourseCurriculumFormData[currentIndex] = {
            ...copycourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            publicID: response?.data?.public_id,
          };
          setCourseCurriculumFormData(copycourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log("courseCurriculumFormData", courseCurriculumFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-3 ">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture{index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlform={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                  className="mb-4"
                  placeholder="Select videos"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
