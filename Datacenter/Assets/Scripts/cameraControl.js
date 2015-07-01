#pragma strict
//获得场景主角的对象
var MainRole : GameObject;
//摄像机的观察点设置为头部上方的Cube
private var LookAtPoint: Transform;
//观察点的旋转四元数
private var LooAtPointQuaternion;
//摄像机与观察点的距离
var distance = 15.0;
var minidistance = 10;
var maxidistance = 70;
//摄像机的高度，可以不用
//var height = 5.0;
//摄像机距离调整系数
var distanceAdjust = 10;
//旋转、俯仰调整系数
var rotationYAdjust = 10.0;
var rotationXAdjust = 10.0;
//摄像机高度调整系数
var heightAdjust = 10.0;
//观察点Y轴的旋转系数（调整旋转）
var yQuaternion:Quaternion;
var rotationY = 0F;
var minimumY = -360F;
var maximumY = 360F;
//观察点X轴的旋转系数（调整俯仰）
var xQuaternion:Quaternion;
var rotationX = -1.5F;
var minimumX = -75F;
var maximumX = 75F;

var currentRotationAngle = 0F;
var wantedRotationAngle = 0F;
// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow")
function Start()
{
	//MainRole = GameObject.Find("floor");
	LookAtPoint = MainRole.transform;
}

function Update () {

	if (!LookAtPoint)
	return;
	//鼠标左键控制摄像机的上下左右转动，以观察玩家角色
	//计算摄像机需要绕观察点坐标系的各个轴的角度值
	if(Input.GetMouseButton(1))
	{
		//旋转计算-----------绕观察点的Y轴
		rotationY += Input.GetAxis("Mouse X") * rotationYAdjust ;
		rotationY = ClampAngleY(rotationY, minimumY, maximumY);
		yQuaternion = Quaternion.AngleAxis(rotationY, LookAtPoint.up);

		//俯仰计算-----------绕观察点的X轴
		rotationX += Input.GetAxis("Mouse Y") * rotationXAdjust ;
		rotationX = ClampAngleX(rotationX, minimumX, maximumX);
		xQuaternion = Quaternion.AngleAxis(rotationX, LookAtPoint.right);
	}

	//计算摄像机距离
	var distanceDelta = Input.GetAxis("Mouse ScrollWheel");
	distance += -distanceDelta * distanceAdjust;
	distance = Mathf.Clamp(distance, minidistance, maxidistance);

	//注意四元数的乘法顺序，unity3d的四元数与向量可以直接乘，结果为一个向量
	//这里的理解跟D3D不同，可以把Q*V理解为“V向量被四元数Q给改变了”，unity3d中，四元数必须作为左操作数才能与向量相乘，详情看Quaternion重载的*符号操作

	//将摄像机坐标系与观察点坐标系相重合
	transform.position = LookAtPoint.position;
	transform.rotation = LookAtPoint.rotation;

	//将摄像机在世界坐标系下进行旋转
	var cameraRotationW = Quaternion.Euler (rotationX, rotationY + LookAtPoint.eulerAngles.y, 0);

	//沿着摄像机Z轴方向的反方向向后拉摄像机，使其与观察点距离相距distance
	transform.position += cameraRotationW * Vector3(0.0, 0.0, -distance);
	// 如果低于主角的高度，就设置为主角的高度，+1 是为了不让摄像机看到地面以下
	if (transform.position.y) {
		transform.position.y = MainRole.transform.position.y+heightAdjust;
	}
	// 让摄像机器最终对准观察点
	transform.LookAt (LookAtPoint);
}
function ClampAngleY(angle : float, min : float, max : float)
{
	
	if (angle <= min) {angle += max;} 
	if (angle >= max){
		angle -= max;
	}
	return Mathf.Clamp(angle, min, max);
}
function ClampAngleX(angle:float, min:float, max:float)
{
	if (angle == max){
		angle = max;
	}
	return Mathf.Clamp(angle, min, max);
}
