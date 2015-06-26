#pragma strict



function Start () {
	
}

function Update () {

	/*if(Input.GetMouseButton(0)){
		gameObject.transform.Translate(Input.GetAxis("Mouse X")*6*Time.deltaTime,0,0,Space.Self);
		gameObject.transform.Translate(0,0,Input.GetAxis("Mouse Y")*6*Time.deltaTime,Space.Self);
	}*/
}

/*function OnMouseEnter(){
	if(Input.GetMouseButton(0)){
		gameObject.transform.Translate(Input.GetAxis("Mouse X")*6*Time.deltaTime,0,0,Space.Self);
		gameObject.transform.Translate(0,0,Input.GetAxis("Mouse Y")*6*Time.deltaTime,Space.Self);
	}
}*/

function OnMouseDown () {
    var screenSpace = Camera.main.WorldToScreenPoint(transform.position);//三维物体坐标转屏幕坐标
    //将鼠标屏幕坐标转为三维坐标，再算出物体位置与鼠标之间的距离
    var offset = transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z));
    print("down");
    while (Input.GetMouseButton(0))
    {
        //print("button0");
        var curScreenSpace = Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z);
        var curPosition = Camera.main.ScreenToWorldPoint(curScreenSpace) + offset;
        //transform.position = curPosition;
        transform.position.x = curPosition.x;
        transform.position.z = curPosition.z;
        yield;//这个很重要，循环执行
    }
}