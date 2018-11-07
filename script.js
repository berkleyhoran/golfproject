let coursecollection;
var numplayers = 5;
let numholes = 18;
var courseId = 11819;
var thisteetype = 1;
var yards = [];
var mycourse;

(function(){
    loadDoc();
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

            let teeArray = mycourse.data.holes[0].teeBoxes;
            
            /*$(this).siblings*/

            for(let i = 0; i < teeArray.length; i++){
                $('.teeselect').append(`<option value="${i}"> ${teeArray[i].teeType}</option>`);
            }
            $('.teeselect').show(100)
            yards = [];
            for(let z = 0; z < numholes; z++){
                
                yards.push(mycourse.data.holes[z].teeBoxes[thisteetype].yards);
            }

            buildcard();
        
            

        }
    }
    http.open("GET", `http://golf-courses-api.herokuapp.com/courses/${courseId}`, true);
    http.send();
}


function chooseTee(value){
    thisteetype = value;
    loadCourse($(".courses").val());
}

function buildcard() {
    $('.card').hide(0);
    $(".card").children().remove()
    $('.card').show(0);
    for(let i = 1; i <= numholes; i++){
        $(".card").append(`<div id="col${i}" class="column"><h3>Hole ${i}, ${yards[i - 1]} Yards</h3></div>`);
    }
    
    addholes();

}
function addholes() {
    for(p = 1; p <= numplayers; p++){
        for(h = 1; h <= numholes; h++){
        $("#col" + h).append(`<span><p>Player ${p}</p><input class="hole" type="text" id=p${p}h${h} /></span>`);
    }

}}
function choosePlayer(players){
    numplayers = players;
    buildcard();
}

