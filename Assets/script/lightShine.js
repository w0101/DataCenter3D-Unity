#pragma strict

private var cMainLight : Color;
private var cMainDark : Color;
private var i : float = 0.0;
var on : Texture2D;
var off : Texture2D;
//private var cSpec : Color;
function Start () {
	//gameObject.renderer.material.
	//print(gameObject.renderer.material.color.ToString());
	cMainLight = gameObject.renderer.material.color;
	cMainDark = cMainLight;
	cMainDark.a = 0;
	//print(cMainDark.ToString());
	//print(gameObject.renderer.materials[0].shader;
}

function Update () {
	
	if(i >= 0.5){
		//i = 0.0;
		//gameObject.renderer.material.SetTexture("_Illumin",off);
		gameObject.renderer.material.color = cMainDark;
	}
	if(i >= 1){
		i = 0.0;
		//gameObject.renderer.material.SetTexture("_Illumin",on);
		gameObject.renderer.material.color = cMainLight;
	}
	i = i+Time.deltaTime;
	
}