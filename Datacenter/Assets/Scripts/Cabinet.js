#pragma strict

private var doubleClickDelay : float = 0.4f;
private var firstClick : boolean = false;
private var secondClick : boolean = false;
private var firstClickTime : float;
private var secondClickTime : float;
var detailInfo : InputPanelControl;
var cabinetType : String = 'cabinet';

function Start () {
	Debug.Log("----------cabinet start---------------");
}

function Update () {
	if (Time.time - firstClickTime > doubleClickDelay) {
	    firstClick = false;
	    secondClick = false;
	}
	if (secondClickTime - firstClickTime < doubleClickDelay && secondClickTime - firstClickTime > 0) {
	    firstClickTime = 0.0;
	    secondClickTime = 0.0;
	    Debug.Log("一次双击");
	    if(renderer.material.color == Color.red) {
	    	//todo:NGUI不合理位置
	    	Debug.Log("放在不合理的位置");
	    }
	    else {
	    	var row : float = gameObject.transform.position.x;
	    	var rack : float = gameObject.transform.position.z;
	    	Debug.Log(transform.position);
	    	detailInfo.show(row, rack, cabinetType);
	    }
	}
}

function OnMouseDown () {
    var screenSpace = Camera.main.WorldToScreenPoint(transform.position);//三维物体坐标转屏幕坐标
    //将鼠标屏幕坐标转为三维坐标，再算出物体位置与鼠标之间的距离
    var offset = transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z));
    while (Input.GetMouseButton(0))
    {
        var curScreenSpace = Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z);
        var curPosition = Camera.main.ScreenToWorldPoint(curScreenSpace) + offset;
        //transform.position = curPosition;
        transform.position.x = curPosition.x;
        transform.position.z = curPosition.z;
        yield;
    }
}

function OnMouseUp() {
	if (firstClick == false) {
	    firstClick = true;
	    firstClickTime = Time.time;
	    Debug.Log("第一次点击："+firstClickTime);
	    return;
	}
	if (firstClick) {
	    secondClick = true;
	    secondClickTime = Time.time;
	    firstClick = false;
	    Debug.Log("第er次点击："+secondClickTime);
	}

}

function OnTriggerEnter(collision:Collider){
	Debug.Log("enter");
	renderer.material.color = Color.red;
}
function OnTriggerExit(collision:Collider){
	Debug.Log("enter");
	renderer.material.color = Color.white;
}
