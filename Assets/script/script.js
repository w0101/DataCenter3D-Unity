//#pragma strict

var camera1 : GameObject;
var camera2 : GameObject;
var camera3 : GameObject;
//var pic : Texture2D;
var cab : GameObject;
var eventObj : GameObject;
var cabs : GameObject[];
var cabWidth : float = 0.8;
var cabDeep : float = 1;
var cabHeight : float = 2;
var room : int;
private var screenWidth : int;
private var screenHeight : int;
private var mousePos : Vector3;
private var url : String = "http://10.108.216.194:8080/DataCenter/cabdevicedata!listAllCabAndDeviceData?room=1";
private var eventUrl : String = "http://10.108.216.194:8080/DataCenter/event!listLastEvent";
private var events : LitJson.JsonData;
private var tim : float = 0.0;

function Start () {

	screenWidth = Screen.width;
	screenHeight = Screen.height;
	
	//request serverroom data
	var requestData : WWW;
	requestData = WWW(url);
	yield requestData;
	
	//Debug.log(requestData);
	//print(requestData);
	
	//change textdata to jsondata
	
	var json : LitJson.JsonData = LitJson.JsonMapper.ToObject(requestData.text);
	var serverRoom : LitJson.JsonData;
	var cabinets : LitJson.JsonData;
	var length : int = 0;
	serverRoom = json['serverRoom'];
	cabinets = json['cabinets'];
	events = json['events'];
	for(var cabinet  : LitJson.JsonData in cabinets){
		length ++;
	}
	//print(length.ToString());
	room = int.Parse(serverRoom['id'].ToString());
	//base information
	
	var totalRow : int = int.Parse(serverRoom['rownumbers'].ToString());
	var totalRack : int = int.Parse(serverRoom['racknumbers'].ToString());
	var halfRow : int ;
	if(totalRow%2==0){ halfRow = totalRow/2; }else{halfRow = (totalRow+1)/2;}
	var startLeftX : float = -(totalRack+1)*cabWidth;
	var startLeftZ : float = -halfRow*cabDeep;
	var startY : float = cabHeight/2;
	var startRightX = cabWidth;
	
	//instanite cab
	var cabLen : int = 0;
	cabs = new GameObject[length];
	for(var cabinet  : LitJson.JsonData in cabinets){
		var row : int = int.Parse(cabinet['row'].ToString());
		var rack : int = int.Parse(cabinet['rack'].ToString());
		//var hasEvent : int = inEvents(row,rack,room);
		//if(hasEvent == 1){print(cabinet['row'].ToString()+"行"+cabinet['rack']+"列机柜有警告事件");}
		var pos : Vector3;
		if(row <= halfRow){
			pos.x = startLeftX + (rack-1)*cabWidth;
			pos.z = startLeftZ + (row-1)*2*cabDeep;
		}else{
			pos.x = startRightX + (rack-1)*cabWidth;
			pos.z = startLeftZ + (row-halfRow-1)*2*cabDeep;
		}
		pos.y = startY;
		
		cabs[cabLen] = GameObject.Instantiate(cab);
		cabs[cabLen].transform.position = pos;
		cabs[cabLen].GetComponent("Cabinet").row = row;
		cabs[cabLen].GetComponent("Cabinet").rack = rack;
		//cabs[cabLen].GetComponent("Cabinet").event = inEvents(row,rack,room);
		cabs[cabLen].name = cabinet['row'].ToString()+"行"+cabinet['rack']+"列机柜";
		addEvents(cabs[cabLen],row,rack,room);
		cabLen++;

	}
}

function Update () {
	if(tim>120){
		requestEventData();
		tim = 0;
		
	}
	tim+=Time.deltaTime;
}
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

function addEvents(obj:GameObject,row:int,rack:int,room:int){
	var eRow : int;
	var eRack : int;
	var eRoom : int;
	for(var e:LitJson.JsonData in events){
		eRow = int.Parse(e['row'].ToString());
		eRack  = int.Parse(e['rack'].ToString());
		eRoom = int.Parse(e['rid'].ToString());
		if(row==eRow && rack==eRack && room==eRoom){
			var eventObject = GameObject.Instantiate(eventObj);
			eventObject.name = "event";
			eventObject.GetComponent("Event").pos = e['layer'].ToString()+"层服务器";
			eventObject.GetComponent("Event").detail = e['eventDetail'].ToString();
			eventObject.transform.parent = obj.transform;
			//print(e[eventLevel'].ToString());
			if(e['eventLevel'].ToString()=="警告" && obj.GetComponent("Cabinet").state!=2){
					obj.GetComponent("Cabinet").state =1;
			}else if(e['eventLevel'].ToString()=="严重"){
					obj.GetComponent("Cabinet").state =2;
			}
		}
	}
	
}

function requestEventData(){
//var i : int=0;
	var requestData : WWW;
	requestData = WWW(eventUrl);
	yield requestData;
	print(requestData.text);
	events = LitJson.JsonMapper.ToObject(requestData.text)['data'];
	for(var obj:GameObject in cabs){
		var row : int = obj.GetComponent("Cabinet").row;
		var rack : int = obj.GetComponent("Cabinet").rack;
		for(var child : Transform in obj.transform){
			if(child.gameObject.name == "event"){
				//child.parent = null;
				Destroy(child.gameObject);
				//i++;
			}
		}
		//print(i.ToString());
		i=0;
		addEvents(obj,row,rack,room);
	}
}