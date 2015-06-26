#pragma strict
var camera1 : GameObject;
var camera2 : GameObject;
var camera3 : GameObject;


function OnGUI(){
	if(GUI.Button(Rect(10,10,64,32),"全景")){
		//gameObject.camera.depth = 1;
		onActiveFalse();
		camera1.active=true;
	}
	if(GUI.Button(Rect(80,10,64,32),"漫游")){
		//gameObject.camera.depth = 2;
		onActiveFalse();
		camera2.active=true;
	}
	if(GUI.Button(Rect(150,10,64,32),"轨迹")){
		//gameObject.camera.depth = 3;
		onActiveFalse();
		camera3.active=true;
	}	
}


function onActiveFalse()
{
        camera1.active=false;
        camera2.active=false;
        camera3.active=false;
}

function Start () {

}

function Update () {

}