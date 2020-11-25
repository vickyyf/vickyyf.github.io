var can = document.getElementById("myCanvas");
//���û�ͼ����
var cxt = can.getContext("2d");
cxt.fillStyle = 'rbga(255, 255, 255, 0)';
//��ȡ��������ڵĿ��
var w = can.width = window.innerWidth;
var h = can.height = window.innerHeight;
//�û����Ŀ�߸�����������ڵı仯���仯
window.onresize = function () {
    w = can.width = window.innerWidth;
    h = can.height = window.innerHeight;
};

//���û�����ɫ
cxt.fillStyle = "aqua";

//�������
var drops = [];
// ������ζ���
function Drop() { }
//��Ӷ��󷽷�
Drop.prototype = {
    init: function () { //��ʼ������ ����ÿ����εĳ�ʼ������
        //��������
        this.x = random(0, w);
        this.y = 0;
        //y������ٶ�ֵ
        this.vy = random(4, 5);
        //�����������߶�
        this.l = random(0.8 * h, 0.9 * h);
        //���Ƶĳ�ʼ�뾶
        this.r = 1;
        this.vr = 1; //�뾶������ٶ�
        //�ж������ʧ��͸����
        this.a = 1; // =>0
        this.va = 0.96; //͸���ȵı仯ϵ��
    },
    draw: function () { //����ͼ��
        if (this.y > this.l) { //������䵽��ָ��λ�� ��ʼ����Բ��
            cxt.beginPath(); //�ȿ�ʼ·��
            cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            cxt.strokeStyle = "rgba(0,255,255," + this.a + ")";
            cxt.stroke();
        } else { //������������
            cxt.fillStyle = "rgb(0,255,255)";
            cxt.fillRect(this.x, this.y, 2, 10);
        }

        this.update();
    },
    update: function () { //��������λ��
        if (this.y < this.l) {
            this.y += this.vy
        } else { //������䵽��ָ��λ�� ��ʼ���Ʋ���
            if (this.a > 0.03) {
                this.r += this.vr;
                if (this.r > 50) {
                    this.a *= this.va;
                }
            } else {
                //���³�ʼ��
                this.init()
            }

        }
    }
};
//�½�һ�����ʵ��������
//var drop = new Drop();
//drop.init();// ��ʼ��
//drop.draw();//����
for (var i = 0; i < 30; i++) {
    setTimeout(function () {
        var drop = new Drop();
        drop.init();
        drops.push(drop);
    }, i * 300)

}
//console.log(drops)
function move() {
    //cxt.clearRect(0,0,w,h);
    //�ȸ���͸�����ٻ������ ��ξͰ��Ȼ��Ƶ�͸���㸲�� ��һ�λ���͸����
    //�ͻ��֮ǰ���Ƶ���θ��� ���ɵ�͸������Ӿͻ�Խ��Խ��͸��
    cxt.fillStyle = "rgba(0,0,0,0.1)";
    cxt.fillRect(0, 0, w, h);
    for (var k = 0; k < drops.length; k++) {
        drops[k].draw();
    }
    requestAnimationFrame(move);
}
move();
//����������ķ���
function random(min, max) {
    return Math.random() * (max - min) + min; //min - max֮��������
}