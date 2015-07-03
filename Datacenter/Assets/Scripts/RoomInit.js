//#pragma strict

var parentObj : Transform;
var cabModel : GameObject[];
var floor : GameObject;

var cabSize : Vector3 = new Vector3(0.8,2,1);
private var room : int = 161;
//private var mousePos : Vector3;
private var roomWidth : float = 0;
private var roomDepth : float = 0;
private var url : String = "http://localhost:8080/DataCenter/models!listAllModels?room=161";

function getRoom(){
	return room;
}
function setRoom(roomId : int){
	room = roomId;
}
function Start () {

	//request serverroom data
	/*var requestData : WWW;
	requestData = WWW(url);
	yield requestData;
	
	//change textdata to jsondata
	print(requestData.text);
	var json : LitJson.JsonData = LitJson.JsonMapper.ToObject(requestData.text);
	var serverRoom : LitJson.JsonData = json['serverRoom'];
	var cabinets : LitJson.JsonData = json['cabinets'];
	
	
	//Add Room Floor
	room = int.Parse(serverRoom['id'].ToString());
	roomWidth = float.Parse(serverRoom['roomLength'].ToString());
	roomDepth = float.Parse(serverRoom['roomWidth'].ToString());
	var roomFloor = GameObject.Instantiate(floor);
	roomFloor.transform.localScale.x = roomWidth/10;
	roomFloor.transform.localScale.z = roomDepth/10;
	roomFloor.name = "floor";
	roomFloor.transform.parent = parentObj;
	
	//Compute Cab Position
	var totalRow : int = int.Parse(serverRoom['rownumbers'].ToString());
	var totalRack : int = int.Parse(serverRoom['racknumbers'].ToString());
	var halfRow : int ;
	if(totalRow%2==0){ halfRow = totalRow/2; }else{halfRow = (totalRow+1)/2;}
	var startLeftX : float = -(totalRack+1)*cabSize.x;
	var startLeftZ : float = -halfRow*cabSize.z;
	var startY : float = cabSize.y/2;
	var startRightX = cabSize.x;
	
	//instanite cab
	var cabs : GameObject[];
	var cabLen : int = 0;
	var length : int = 0;
	for(var cabinet  : LitJson.JsonData in cabinets){
		length ++;
	}
	cabs = new GameObject[length];
	for(var cabinet  : LitJson.JsonData in cabinets){
		var row : int = int.Parse(cabinet['row'].ToString());
		var rack : int = int.Parse(cabinet['rack'].ToString());
		var pos : Vector3;
		if(row <= halfRow){
			pos.x = startLeftX + (rack-1)*cabSize.x;
			pos.z = startLeftZ + (row-1)*2*cabSize.z;
		}else{
			pos.x = startRightX + (rack-1)*cabSize.x;
			pos.z = startLeftZ + (row-halfRow-1)*2*cabSize.z;
		}
		pos.y = startY;
		
		cabs[cabLen] = GameObject.Instantiate(cabModel[0]);
		cabs[cabLen].transform.position = pos;
		cabs[cabLen].name = cabinet['row'].ToString()+"行"+cabinet['rack']+"列机柜";
		cabs[cabLen].transform.parent = parentObj;
		cabLen++;

	}*/
}

