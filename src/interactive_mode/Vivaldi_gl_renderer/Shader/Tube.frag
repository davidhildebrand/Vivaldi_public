in vec4 VertexColor;
in vec3 aNormal;
uniform float ScaleValue;
uniform mat4 ModelViewMatrix;

uniform vec4 light_position; 
uniform vec4 light_ambient; 
uniform vec4 light_diffuse; 
uniform vec4 light_specular; 
uniform vec4 light_att;
uniform vec4 material_ambient; 
uniform vec4 material_diffuse; 
uniform vec4 material_specular; 
uniform float material_shineness; 

void main() {
	vec4 vPosition = gl_FragCoord;
	mat4 mNormal = transpose(inverse(ModelViewMatrix));
	vec4 vNormal = mNormal * vec4(aNormal, 1.0);
	vec3 N = vNormal.xyz; 
	vec3 L = normalize((ModelViewMatrix*light_position).xyz - vPosition.xyz); 
	vec3 V = normalize(vPosition.xyz); 
	vec3 R = normalize(2 * dot(L, N) * N - L); 
	vec4 ambient = light_ambient * material_ambient; 
	float d = length((ModelViewMatrix*light_position).xyz - vPosition.xyz); 
	float denom = light_att.x + light_att.y * d + light_att.z * d * d; 
	vec4 diffuse = max(dot(L, N), -1.0) * light_diffuse * material_diffuse / denom; 
	vec4 specular = pow(max(dot(R, V), -1.0), material_shineness) * light_specular * material_specular / denom; 
  	
  	gl_FragColor = VertexColor + ambient*0.1 + diffuse*0.5; 
	
}
