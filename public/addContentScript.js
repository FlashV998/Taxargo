// $(document).ready(function(){
    
//     // SIGN-UP PAGE JS
//     $(function() {
  
//         // contact form animations
//         $('#sign-up').click(function() {
//           $('#signForm').fadeToggle();
//         })
//         $(document).mouseup(function (e) {
//           var container = $("#signForm");
      
//           if (!container.is(e.target) // if the target of the click isn't the container...
//               && container.has(e.target).length === 0) // ... nor a descendant of the container
//           {
//               container.fadeOut();
//           }
//         });
        
//       });

//     $("#addCoowner").click(function(){
//     $(".Co-Owner").append('<div class="form-row"><div class="form-group col-md-3"><label for="inputAddress">Name of Co-Owner</label><input type="text" class="form-control"  required></div><div class="form-group col-md-3"><label for="inputAddress2">PAN of Co-Owner </label><input type="text" class="form-control"  required></div><div class="form-group col-md-3"><label for="inputAddress2">% share of Co-Owner</label><input type="text" class="form-control" required></div><a class="btn delete-owner col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>')
//         });

//     $(".Co-Owner").on("click",'.delete-owner', function() {
//             $(this).parent('div').remove();
//         });


//         $("#addCost").click(function(){
//             $(".show-5-1").append('<div class="form-row  justify-content-around "><div class="form-group col-md-4"><label for="firstname">Description</label><input type="fname" class="form-control" id="firstname" required placeholder="firstname"></div><div class="form-group col-md-4"><label for="middlename">Amount</label><input type="mname" class="form-control" id="middlename" required placeholder="middlename"></div><div class="form-group col-md-2" ><a class="btn delete-cost-1 col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>')
//                 });
        
//                 $(".show-5-1").on("click",'.delete-cost-1', function() {
//                     $(this).parent('div').parent('div').remove();
//                 });

//                 $("#addCost-2").click(function(){
//                     $(".show-5-3").append('<div class="form-row  justify-content-around "><div class="form-group col-md-4"><label for="firstname">Description</label><input type="fname" class="form-control" id="firstname" required placeholder="firstname"></div><div class="form-group col-md-4"><label for="middlename">Amount</label><input type="mname" class="form-control" id="middlename" required placeholder="middlename"></div><div class="form-group col-md-2" ><a class="btn delete-cost-2 col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>')
//                         });
                
//                         $(".show-5-3").on("click",'.delete-cost-2', function() {
//                             $(this).parent('div').parent('div').remove();
//                         });
        




//                 $("#addBuyer").click(function(){
//                     $(".show-5-2").append(' <div class="form-row"><div class="form-group col-md-2"><label for="inputAddress">Name</label><input type="text" class="form-control"  required></div><div class="form-group col-md-2"><label for="inputAddress2">PAN</label><input type="text" class="form-control"  required></div><div class="form-group col-md-2"><label for="inputAddress2">% Ownership</label><input type="text" class="form-control" required></div><div class="form-group col-md-2"><label for="inputAddress2">Amount Paid</label><input type="text" class="form-control" required></div><div class="form-group col-md-4" ><a class="btn delete-owner col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>')
//                         });
                
//                         $(".show-5-2").on("click",'.delete-owner', function() {
//                             $(this).parent('div').parent('div').remove();
//                         });

// });

// const progress = document.querySelector('.progress-done');

// progress.style.width = progress.getAttribute('data-done') + '%';
// progress.style.opacity = 1;




// // var button_1=document.querySelector("#addCoowner");
// // button_1.addEventListener("click",()=>{
// //     $(".Co-Owner").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
// //  });