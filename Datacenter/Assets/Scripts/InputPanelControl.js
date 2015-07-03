#pragma strict

var InputArr : GameObject[];
var defaultValues : UILabel[];
private var panel : UIPanel; 
private var addCabURL : String = "localhost:8080/DataCenter/serverCabinet!add";
function Start(){
	panel = gameObject.GetComponent("UIPanel"); 
	cancle();
}
//on every input box submit
function onSubmit(source : GameObject){
	if(source != null){
		var index : Index = source.GetComponent("Index");
		var label : UILabel = source.transform.GetChild(1).GetComponent("UILabel");
		var cur : UIInput = source.GetComponent("UIInput");
		//Debug.Log(label.text);
		if(index != null && cur.isSelected == true){
			var i = index.getIndex();
			var next : UIInput = null;
			if(i<=3){
				next = InputArr[i+1].GetComponent("UIInput");
			}
			var sprite : UISprite = source.GetComponent("UISprite");
			Debug.Log(i+"gameObject enter in");
			if(label.text == ""){	
				sprite.color = Color.red;
				Debug.Log("needs num");
			}else{
				sprite.color = Color.white;
				cur.isSelected = false;
				//yield WaitForSeconds (1);
				if(next != null)
					next.isSelected = true;	
			}
		}
		
	}
	//yield WaitForSeconds (1);
}

//on input panel submit
function submit(){
	addCabInfo();

}
function cancle(){
	panel.alpha = 0;
}
function show(row : float, rack : float, type : String) {
	panel.alpha = 1;
	defaultValues[0].text = row + '';
	defaultValues[1].text = rack + '';
	defaultValues[2].text = type;
	var CapacityInput : GameObject = InputArr[0];
	//Debug.Log(CapacityInput);
	var input : UIInput;
	if(CapacityInput != null){
		input = CapacityInput.GetComponent("UIInput");
		input.isSelected = true;
	}
}
function addCabInfo(){
	
	var form : WWWForm = new WWWForm(); 
	var submitable : boolean = true;
	var tips : UILabel = GameObject.Find("Window Panel/Background/Tips").GetComponent("UILabel");
	
	var rowObj : UILabel = GameObject.Find("Window Panel/Row/Input Field/Label").GetComponent("UILabel");
	var rackObj : UILabel = GameObject.Find("Window Panel/Rack/Input Field/Label").GetComponent("UILabel");
	var typeObj : UILabel = GameObject.Find("Window Panel/Type/Input Field/Label").GetComponent("UILabel");
	var capacityObj : GameObject = InputArr[0];
	var limitpowerObj : GameObject = InputArr[1];
	var actualpowerObj : GameObject = InputArr[2];
	var limitweightObj : GameObject = InputArr[3];
	var actualweightObj : GameObject = InputArr[4];
	var elemethodObj : GameObject = GameObject.Find("Window Panel/EleMethod/Input Field"); 
	var infoObj : GameObject = GameObject.Find("Window Panel/Info/Text Box/");
	
	var row :String;
	var rack : String;
	var type : String;
	var capacity : String;
	var limitpower : String;
	var actualpower : String; 
	var limitweight : String;
	var actualweight : String;
	var elemethod : String;
	var info : String;
	
	var roominit : RoomInit = Camera.main.GetComponent("RoomInit");
	var id : int = roominit.getRoom();
	Debug.Log("RoomId:"+id);
	form.AddField("rid",id);
	
	if(rowObj != null){
		row = rowObj.text;
		form.AddField("row", row);  
		Debug.Log(row);
	}
	if(rackObj != null){
		rack = rackObj.text;
		form.AddField("rack", rack); 
		Debug.Log(rack);
	}
	if(typeObj != null){
		type = typeObj.text;
		form.AddField("type", type); 
		Debug.Log(type);
	}
	var input : UIInput;
	var sprite : UISprite;
	if(capacityObj != null){
		input = capacityObj.GetComponent("UIInput");
		sprite = capacityObj.GetComponent("UISprite");
		capacity = input.value;
		Debug.Log("Capacity : "+capacity);
		if(capacity == ""){
			sprite.color = Color.red;
			submitable = false;
		}else{
			sprite.color = Color.white;
			form.AddField("capacity",capacity);
		}
	}
	if(limitpowerObj != null){
	    input = limitpowerObj.GetComponent("UIInput");
	    sprite = limitpowerObj.GetComponent("UISprite");
		limitpower = input.value;
		Debug.Log("limitpower"+limitpower);
		if(limitpower == ""){
			sprite.color = Color.red;
			submitable = false;
		}else{
			sprite.color = Color.white;
			form.AddField("limitpower", limitpower); 
		}
	}
	if(actualpowerObj != null){
		input = actualpowerObj.GetComponent("UIInput");
	    sprite = actualpowerObj.GetComponent("UISprite");
		actualpower = input.value;
		Debug.Log("actualpower:"+actualpower);
		if(actualpower == ""){
			sprite.color = Color.red;
			submitable = false;
		}else{
			sprite.color = Color.white;
			form.AddField("actualpower", actualpower); 
		}
		
	}
	if(limitweightObj != null){
		input = limitweightObj.GetComponent("UIInput");
	    sprite = limitweightObj.GetComponent("UISprite");
		limitweight = input.value;
		Debug.Log("limitweight:"+limitweight);
		if(limitweight == ""){
			sprite.color = Color.red;
			submitable = false;
		}else{
			sprite.color = Color.white;
			form.AddField("limitweight", limitweight); 
		}
	}
	if(actualweightObj != null){
		input = actualweightObj.GetComponent("UIInput");
	    sprite = actualweightObj.GetComponent("UISprite");
		actualweight = input.value;
		Debug.Log("actualweight:"+actualweight);
		if(actualweight == ""){
			sprite.color = Color.red;
			submitable = false;
		}else{
			sprite.color = Color.white;
			form.AddField("actualweight", actualweight);
		} 
	}
	if(elemethodObj != null){
		var popinput : UIPopupList = elemethodObj.GetComponent("UIPopupList");
	    sprite = infoObj.GetComponent("UISprite");
		elemethod = popinput.value;
		Debug.Log("elemethod:"+elemethod);
		form.AddField("elemethod", elemethod); 
	}
	if(infoObj != null){
		input = infoObj.GetComponent("UIInput");
	    sprite = infoObj.GetComponent("UISprite");
		info = input.value;
		Debug.Log("Info:"+info);
		form.AddField("description", info); 
	}
	if(!submitable){
		tips.text = "必填项不能为空";
		return;
	}
	var getData : WWW = WWW(addCabURL, form); 
	tips.text = "添加中，请稍后...";
	 
	yield getData;  
	if(getData.error != null) { 
		tips.text = "添加失败！请检查您的网络"; 
	     Debug.Log(getData.error);  
	}  
	else {  
		tips.text = "添加成功！";
	     Debug.Log(getData.text);  
	}  
}