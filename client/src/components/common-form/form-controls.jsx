function FormControls({formControls = [], formData, setFormData}) {

  function renderComponentByType(){

  }

  return(
    <div className="flex flex-col gap-3">
      {
        formControls.map(controleItem => 
          <div></div>
        )
      }
    </div>
  )
}

export default FormControls;