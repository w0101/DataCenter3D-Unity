#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKey(KeyCode.UpArrow)){
		gameObject.transform.Translate(0,0,2*Time.deltaTime,Space.Self);
	}
	if(Input.GetKey(KeyCode.DownArrow)){
		gameObject.transform.Translate(0,0,-2*Time.deltaTime,Space.Self);
	}
	if(Input.GetKey(KeyCode.LeftArrow)){
		gameObject.transform.Rotate(0,-15*Time.deltaTime,0,Space.Self);
	}
	if(Input.GetKey(KeyCode.RightArrow)){
		gameObject.transform.Rotate(0,15*Time.deltaTime,0,Space.Self);
	}
}