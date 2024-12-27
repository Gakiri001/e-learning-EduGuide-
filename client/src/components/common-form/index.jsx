function CommonForm({handleSubmit, buttonText}) {
  return(
    <form onSubmit={handleSubmit}>
      {/*Render form controls here*/}
      <button type="submit">{buttonText || 'Submit'}</button>
    </form>
  )
}

export default CommonForm;