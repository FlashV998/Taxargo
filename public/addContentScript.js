$(document).ready(function(){
    
    

    $("#addCoowner").click(function(){
    $(".Co-Owner").append('<div class="form-row"><div class="form-group col-md-3"><label for="inputAddress">Name of Co-Owner</label><input type="text" class="form-control"  required></div><div class="form-group col-md-3"><label for="inputAddress2">PAN of Co-Owner </label><input type="text" class="form-control"  required></div><div class="form-group col-md-3"><label for="inputAddress2">% share of Co-Owner</label><input type="text" class="form-control" required></div><a class="btn delete-owner col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>')
        });

    $(".Co-Owner").on("click",'.delete-owner', function() {
            $(this).parent('div').remove();
        });


        $("#addCost").click(function(){
            $(".show-5-1").append('<div class="form-row  justify-content-around "><div class="form-group col-md-4"><label for="firstname">Description</label><input type="fname" class="form-control" id="firstname" required placeholder="firstname"></div><div class="form-group col-md-4"><label for="middlename">Amount</label><input type="mname" class="form-control" id="middlename" required placeholder="middlename"></div><div class="form-group col-md-2" ><a class="btn delete-cost col-md-1"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>')
                });
        
                $(".show-5-1").on("click",'.delete-cost', function() {
                    $(this).parent('div').parent('div').remove();
                });

});




// var button_1=document.querySelector("#addCoowner");
// button_1.addEventListener("click",()=>{
//     $(".Co-Owner").append('<div class="form-row"> <div class="form-group col-md-12"><div class="row"> <div class="col-md-4"><p>Basic Salary</p></div><div class="col-md-4"><input type="text" class="form-control" id="div_sal-1"  required></div><div class="col-md-4"><button id="remove" type="button">X</button></div></div></div></div>')
//  });