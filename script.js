let coursecollection;
var numplayers = 4;
let numholes = 18;
var courseId = 11819;
var thisteetype = 1;
var p1name = "Player 1";
var p2name = "Player 2";
var p3name = "Player 3";
var p4name = "Player 4";
var p1score = [];
var p2score = [];
var p3score = [];
var p4score = [];
var yards = [];
var par = [];
var hcp = [];
var mycourse;

(function(){
    loadDoc();
    $(".selectwrapper").hide();
})();

function loadDoc() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mycourses = JSON.parse(this.responseText);
            console.log(mycourses);
            for(let i = 0; i < mycourses.courses.length; i++) {
                $('.courses').append(`<option value="${mycourses.courses[i].id}"> ${mycourses.courses[i].name}</option>`);
                loadCourse(mycourses[i]);
            }
            
        }
    }
    http.open("GET", "http://golf-courses-api.herokuapp.com/courses", true);
    http.send();
}

function loadCourse(courseId) {
    console.log(courseId);
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            $(".teeselect").children().remove()
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);

            let bgimg = mycourse.data.thumbnail;
            let teeArray = mycourse.data.holes[0].teeBoxes;
            
            /*$(this).siblings*/

            for(let i = 0; i < teeArray.length; i++){
                $('.teeselect').append(`<option value="${i}"> ${teeArray[i].teeType}</option>`);
            }

            $('.teeselect').show(100)
            $('.thumbnail').css(`background-image`, `url("${bgimg}")`);  

            yards = [];
            par = [];
            hcp = [];
            for(let z = 0; z < numholes; z++){
                yards.push(mycourse.data.holes[z].teeBoxes[thisteetype].yards);
                par.push(mycourse.data.holes[z].teeBoxes[thisteetype].par);
                hcp.push(mycourse.data.holes[z].teeBoxes[thisteetype].hcp);
            }

            buildcard();
        
            

        }
    }
    http.open("GET", `http://golf-courses-api.herokuapp.com/courses/${courseId}`, true);
    http.send();
}


function chooseTee(value){
    thisteetype = value;
    loadCourse($(".courses :selected").val());
    loadCourse($(".courses :selected").val());

    p1score = [];
    p2score = [];
    p3score = [];
    p4score = [];

    updatescore(0)
}

function buildcard() {
    $('.card').hide(0);
    $(".card").children().remove()
    $('.card').show(0);
    for(let i = 1; i <= numholes; i++){
        $(".card").append(`<div id="col${i}" class="column"><h3>Hole ${i}</h3><p> ${yards[i - 1]} Yards </p><p> Par ${par[i - 1]}</p><p> Handicap ${hcp[i - 1]}</p></br></div>`);
    }
    
    addholes();

}
function addholes() {
    for(p = 1; p <= numplayers; p++){
        for(h = 1; h <= numholes; h++){
        let name = window["p" + p + "name"];
        $("#col" + h).append(`<span><p id="player${p}">${name} : </p><input class="hole" type="text" id="p${p}h${h}" onchange="updatescore(this);"/></span>`);
    }}
}
function choosePlayer(players){
            numplayers = players;
        $("#hide1").hide();
        $("#hide2").hide();
        $("#hide3").hide();
        $("#hide4").hide();
    if(numplayers == 1){
        $("#hide1").show();
        
    }
    if(numplayers == 2){
        $("#hide1").show();
        $("#hide2").show();
    }
    if(numplayers == 3){
        $("#hide1").show();
        $("#hide2").show();
        $("#hide3").show();
    }
    if(numplayers == 4){
        $("#hide1").show();
        $("#hide2").show();
        $("#hide3").show();
        $("#hide4").show();
    }
    buildcard();
}
function updatescore(value){
    for(p = 1; p <= numplayers; p++){
        for(h = 1; h <= numholes; h++){
            let inputid = $("#p1h" + h).attr('id')
            let input1 = $("#p1h" + h).val()
            if(value.id == inputid){
            p1score.push(input1);
            }
        
            let input2 = $("#p2h" + h).val();
            let input2id = $("#p2h" + h).attr('id')
            if(value.id == input2id){
            p2score.push(input2);
            }


            let input3 = $("#p3h" + h).val();
            let input3id = $("#p3h" + h).attr('id')
            if(value.id == input3id){
            p3score.push(input3);
            }

            let input4 = $("#p4h" + h).val();
            let input4id = $("#p4h" + h).attr('id')
            if(value.id == input4id){
            p4score.push(input4);
            }
            
        }

    }

             var total = 0;
            for (var e = 0; e < p1score.length; e++) {
                total += p1score[e] << 0;
            }
            var total2 = 0;
            for (var q = 0; q < p2score.length; q++) {
                total2 += p2score[q] << 0;
            }
            var total3 = 0;
            for (var k = 0; k < p3score.length; k++) {
                total3 += p3score[k] << 0;
            }
            var total4 = 0;
            for (var r = 0; r < p4score.length; r++) {
                total4 += p4score[r] << 0;
            }

            var totalpar = 0;
            for (var o = 0; o < par.length; o++) {
                totalpar += par[o] << 0;
            }


    $("#1").text(total/numplayers)
    $("#par1").text(total/numplayers - totalpar)

    $("#2").text(total2/numplayers)
    $("#par2").text(total2/numplayers - totalpar)

    $("#3").text(total3/numplayers)
    $("#par3").text(total3/numplayers - totalpar)

    $("#4").text(total4/numplayers)
    $("#par4").text(total4/numplayers - totalpar)
}

function changename(thisname){
     if (thisname.id == "p1n"){
        if($("#p1n").val() != p2name ||  $("#p1n").val() != p3name || $("#p1n").val() != p4name){
            p1name = $("#p1n").val();
        }else{
            p1name = "Guest1" 
        }
        $(thisname).replaceWith($('<p id="p1n">' + p1name + '</p>')); 
     }
     if (thisname.id == "p2n"){
        if($("#p2n").val() != p1name ||  $("#p2n").val() != p3name || $("#p2n").val() != p4name){
            p2name = $("#p2n").val();
        }else{
            p2name = "Guest2"  
        }
        
        $(thisname).replaceWith($('<p id="p2n">' + p2name + '</p>'));
     }
     if (thisname.id == "p3n"){
        if($("#p3n").val() != p1name ||  $("#p3n").val() != p2name || $("#p3n").val() != p4name){
            p3name = $("#p3n").val();
        }else{
            p3name = "Guest3";  
        }
        $(thisname).replaceWith($('<p id="p3n">' + p3name + '</p>'));
     }
     if (thisname.id == "p4n"){
        if($("#p4n").val() != p1name ||  $("#p4n").val() != p2name || $("#p4n").val() != p3name){
            p4name = $("#p4n").val();
        }else{
            p4name = "Guest4";  
        }
        p4name = $("#p4n").val();
        $(thisname).replaceWith($('<p id="p4n">' + p4name + '</p>'));
     }

     $(".selectwrapper").show();

}