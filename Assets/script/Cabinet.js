//#pragma strict


var deng : GameObject;
var ding : GameObject;
var normalColor : Color;
var warningColor : Color;
var badColor : Color;
var row : int;
var rack : int;
var type : String;
var capacity : int;
var state : int = 0;
function Start () {
	
	if(state == 0){
		deng.renderer.material.color = normalColor;
		ding.SetActive(false);
	}
	if(state == 1){
		deng.renderer.material.color = warningColor;
		ding.renderer.material.color = warningColor;
	}
	if(state == 2){
		deng.renderer.material.color = badColor;
		ding.renderer.material.color = badColor;
	}
	
}

function Update () {

}