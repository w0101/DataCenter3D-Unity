#pragma strict

var device : GameObject;
//var parent : Transform;
//private var floor : Collider;
private var hasClicked : boolean = false;
private var dev : GameObject = null;

function Start(){
	Debug.Log("-------------floor start------------");
	createDev();
}
function OnClick(){
	/*var dev = GameObject.Instantiate(device);
		dev.transform.position = new Vector3(0,1,0);
		dev.AddComponent("cabMove");
		dev.transform.parent = parent;
		dev.name = "new cabinet";*/
}
function createDev(){
	if(hasClicked){
		dev = GameObject.Instantiate(device);
		dev.renderer.material.color.a = 0;
		dev.transform.parent = gameObject.transform.parent;
		//dev.AddComponent("Cabinet");
		dev.name = "new Cabinet";
		hasClicked = false;
	}	
}

function Update () {
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if(dev!=null){
		if(collider.Raycast(ray,hit,1000.0)){	
			//Debug.Log (hit.point);
			var pos : Vector3 = hit.point + new Vector3(0,1,0);		
			dev.transform.position = pos;
			dev.renderer.material.color.a = 0.6;
			
		}else{
			dev.renderer.material.color.a = 0;
		}
	}
}
