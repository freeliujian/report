$(function(){
 
    
   $.get('http://localhost/Ajax/%E6%8A%A5%E5%91%8A2/js/response.json',function(data){
       
      var person=data.detail.report_data.msg;
       
       console.log(person);
       $('.userInfo li:eq(0) span:eq(1)').text(person.Name);
       $('.userInfo li:eq(1) span:eq(1)').text(person.Gender);
       $('.userInfo li:eq(2) span:eq(1)').text(person.Age);
       $('.userInfo li:eq(3) span:eq(1)').text(person.TestTime);
       
       var maintypes=person.MainTypes;
        
       $('.type_l p').html(maintypes[0]);
       $('.type_r p').html(maintypes[1]);
      
    $.each(person.Main,function(i){
         
        //console.log(person.Main[i]);
        var $section=$('<section class="trait sheet"></section>');
         
        $($section).insertBefore('[class="sheet"]');
        $(` <img src="./img/picture02复制 2@2x.png" alt="">
        <div class="border">
            <div class="content">
                <p>您的主导职业锚：<span>${i}</span></p>
                <div class="trait_list">
                
                </div>
            </div>
        </div>
        <img src="./img/picture07复制 2@2x.png" style="width: 101%" alt="">`).appendTo($section);
        
        

        $.each(person.Main[i],function(n){ //console.log(person.Main[i]);
            
            $(`<p class="sm_title">${n}</p>`).appendTo($($section).find('.trait_list'));
            
               var index=$($section).find('.sm_title').index();
                if( Array.isArray(person.Main[i][n]) ){  
                    
                    $.each(person.Main[i][n],function(m){       
                       //console.log(person.Main[i][n][m]);
                       $(` <p class="yaundian"></p><p class="wenzi">${person.Main[i][n][m]}</p>`).appendTo($($section).find('.sm_title').eq(index));
                      
                    });
                }else{//console.log(person.Main[i][n]);
                    $(` <p class="yaundian"></p><p class="wenzi">${person.Main[i][n]}</p>`).appendTo($($section).find('.sm_title').eq(index));
                }
               
  
        });

        
    });

     
  
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    
    // 指定图表的配置项和数据
    var option = {

        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: "20%"
        },
        xAxis: [
            {
                type: 'value',
                scale: true,
                show: false,
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
            splitLine: {
                show: false
            },
            "axisTick": {       //y轴刻度线
                "show": false
            }, "axisLine": {       //y轴
                "show": false

            },
            data: ['技术/职能型', '管理型', '自主/独立型', '安全/稳定型', '创业型', '服务型', '挑战型', '生活型'],
            type: 'category'
        }],
        series: [
            {
                type: 'bar',

                name: '总量',
                data: [45, 89, 40, 50, 60, 70, 66, 80],
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#1DE9B6'
                        }, {
                            offset: 1,
                            color: '#1DC4E9'
                        }]), label: {
                            show: true,		//开启显示
                            position: 'right',	//在上方显示
                            textStyle: {	    //数值样式
                                color: '#333333',
                                fontSize: 16
                            }
                        }
                    }
                },
                barCategoryGap: '50%',
            }
        ]

    };
    // 使用刚指定的配置项和数据显示图表。
    var score=person.Score;
    //console.log(option.series[0].data);
    //console.log(option.yAxis[0].data);
    option.yAxis[0].data=[];
    option.series[0].data=[];
    $.each(score,function(i){
        
        option.yAxis[0].data.push(score[i][0]);
        option.series[0].data.unshift(score[i][1]);
    });
    
    myChart.setOption(option);

   });

   
});