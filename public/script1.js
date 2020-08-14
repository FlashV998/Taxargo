document.addEventListener("DOMContentLoaded", () => {
    class MultiStep {
     constructor(formId) {
      let myForm = document.querySelector(formId),
       steps = myForm.querySelectorAll(".inner-section-step"),
       btnPrev = myForm.querySelector(".btnPrev"),
       btnNext = myForm.querySelector(".btnNext"),
      //  indicators = myForm.querySelectorAll(".rounded-circle"),
       inputClasses = ".form-control",
       currentTab = 0,
       counter=0,
      //  button_1= myForm.querySelector("#clickMe-1"),
      //  button_2= myForm.querySelector("#clickMe-2"),
      //  button_3= myForm.querySelector("#clickMe-3"),
      //  button_b_1= myForm.querySelector("#clickMe_b-1"),
       removeb=myForm.querySelector("#remove");
      //  option1=myForm.querySelector(".option1"),
      //  option2=myForm.querySelector(".option2"),
      //  option3=myForm.querySelector(".option3"),
      //  option4=myForm.querySelector(".option4"),
      //  option5=myForm.querySelector(".option5");
       
       
    //hidding functions step:4
      
    $("#show-button-4-1").click(function(){
        $("#show-4-1").toggle(200);
         $("#show-button-4-1").hide();
      
      });

      $("#show-button-5-1").click(function(){
           $(".show-5-1cont").toggle(200);
            // $("#show-button-5-1").hide();
            });

            $("#show-button-5-3").click(function(){
                 $(".show-5-3cont").toggle(200);
                  // $("#show-button-5-1").hide();
                  });

                  $("#show-button-5-0").click(function(){
                       $(".show-5-0cont").toggle(200);
                        // $("#show-button-5-1").hide();
                        });

                  $("#show-button-7-1").click(function(){
                       $(".show-7-1cont").toggle(200);
                        // $("#show-button-5-1").hide();
                        });
      


      $(document).on('change', '.div-toggle', function() {
         var target = $(this).data('target');
         var show = $("option:selected", this).data('show');
         $(target).children().addClass('hide');
         $(show).removeClass('hide');
       });
       $(document).ready(function(){
           $('.div-toggle').trigger('change');
       });
    //hidding functions      
       
      
      
      
       // we'll need 4 different functions to do this
      showTab(currentTab);
   
      function showTab(n) {
       steps[n].classList.add("active");
       if (n == 0) {
        btnPrev.classList.add("hidden");
        btnPrev.classList.remove("show");
       } else {
        btnPrev.classList.add("show");
        btnPrev.classList.remove("hidden");
       }
       if (n == steps.length - 1) {       //if i had used curttab value as 1 than n==steps.length would be valid
        btnNext.textContent = "Submit";
       } else {
        btnNext.textContent = "Next";
       }
       
      }
   
      // function showIndicators(n) {
      //  for (let i = 0; i < indicators.length; i++) {
      //   indicators[i].classList.replace("bg-warning", "bg-success");
      //  }
      //  indicators[n].className += " bg-warning";
      // }
   
      
   // Do whatever validation you want
      function validateForm() {
       let input = steps[currentTab].querySelectorAll(inputClasses),
        valid = true;
       for (let i = 0; i < input.length; i++) {
        if (input[i].value == "") {
         if (!input[i].classList.contains("invalid")) {
          input[i].classList.add("invalid");
         }
         valid = false;
        }
        if (!input[i].value == "") {
         if (input[i].classList.contains("invalid")) {
          input[i].classList.remove("invalid");
         }
        }
       }
       return valid;
      }
      
      function clickerBtn(n) {
         if (n == 1 && !validateForm() ) return false;
         steps[currentTab].classList.remove("active");
         currentTab = currentTab + n;
         if (currentTab >= steps.length) {
          myForm.submit();
          return false;
         }
         showTab(currentTab);
        //  showIndicators(currentTab);
        }

      btnPrev.addEventListener("click", () => {
       clickerBtn(-1);
      });
      btnNext.addEventListener("click", () => {
       clickerBtn(1);
       });
      
      // option1.addEventListener("click",()=>{
      //    currentTab=0;
      //    for(let j=0;j< steps.length;j++){
      //       steps[j].classList.remove("active");
      //       }
      //    showTab(currentTab);
      // });
      // option2.addEventListener("click",()=>{
      //    currentTab=1;
      //    for(let j=0;j< steps.length;j++){
      //       steps[j].classList.remove("active");
      //       }
      //    showTab(currentTab);
      // });
      // option3.addEventListener("click",()=>{
      //    currentTab=2;
      //    for(let j=0;j< steps.length;j++){
      //       steps[j].classList.remove("active");
      //       }
      //    showTab(currentTab);
      // });
      // option4.addEventListener("click",()=>{
      //    currentTab=3;
      //    for(let j=0;j< steps.length;j++){
      //       steps[j].classList.remove("active");
      //       }
      //    showTab(currentTab);
      // }); 
      // option5.addEventListener("click",()=>{
      //    currentTab=4;
      //    for(let j=0;j< steps.length;j++){
      //       steps[j].classList.remove("active");
      //       }
      //    showTab(currentTab);
      // });
      // button_1.addEventListener("click",()=>{
      //    $(".button-container-1").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
      // });
      // button_2.addEventListener("click",()=>{
      //    $(".button-container-2").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
      // });
      // button_3.addEventListener("click",()=>{
      //    $(".button-container-3").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
      // });
      // button_b_1.addEventListener("click",()=>{
      //    $(".button-container_b-1").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
      // });
      // removeb.addEventListener("click",()=>{
      //    $("#remove").parent("div").remove();
      // });
     }
    }
    let MS = new MultiStep("#stepped");
   });
   


   