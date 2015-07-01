#pragma strict

var cabLabel : UILabel;
var airLabel : UILabel;
var UPSLabel : UILabel;
var Tween : UIPlayTween[];

function OnCabClick(){
	if(cabLabel.text == "[[FF6333]+[-]]机柜"){
		cabLabel.text = "[[FF6333]-[-]]机柜";
		if(airLabel.text == "[[FFFF66]-[-]]空调"){
			Tween[1].Play(true);
			airLabel.text = "[[FFFF66]+[-]]空调";
		}
		if(UPSLabel.text == "[[66FA33]-[-]]UPS"){
			Tween[2].Play(true);
			UPSLabel.text = "[[66FA33]+[-]]UPS";
		}
	}else{
		cabLabel.text = "[[FF6333]+[-]]机柜";
	}
}
function OnAirClick(){
	if(airLabel.text == "[[FFFF66]+[-]]空调"){
		airLabel.text = "[[FFFF66]-[-]]空调";
		if(cabLabel.text == "[[FF6333]-[-]]机柜"){
			Tween[0].Play(true);
			cabLabel.text = "[[FF6333]+[-]]机柜";
		}
		if(UPSLabel.text == "[[66FA33]-[-]]UPS"){
			Tween[2].Play(true);
			UPSLabel.text = "[[66FA33]+[-]]UPS";
		}
	}else{
		airLabel.text = "[[FFFF66]+[-]]空调";
	}
}
function OnUPSClick(){
	if(UPSLabel.text == "[[66FA33]+[-]]UPS"){
		UPSLabel.text = "[[66FA33]-[-]]UPS";
		if(cabLabel.text == "[[FF6333]-[-]]机柜"){
			Tween[0].Play(true);
			cabLabel.text = "[[FF6333]+[-]]机柜";
		}
		if(airLabel.text == "[[FFFF66]-[-]]空调"){
			Tween[1].Play(true);
			airLabel.text = "[[FFFF66]+[-]]空调";
		}
	}else{
		UPSLabel.text = "[[66FA33]+[-]]UPS";
	}
}