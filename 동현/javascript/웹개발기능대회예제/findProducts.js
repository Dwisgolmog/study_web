let productName = '';

function findProudcts(){
    productName = $('#findProducts').val();

    //productName의 널또는 공백검사
    if(productName != ''  && !(/^[\s]+/.test(productName)) ){
        let searchData = []; //일치한 검색값을 담을 변수
        let packagePro ='';
        for(let i=0; i<$('.col-sm-3 h5').length; i++){

            const name = $(`.col-sm-3 h5`).eq(i).html()
            //검색한 값이 상품에 있을때 searchData에 저장
            if( name.includes(productName)){
                //replace를 활용하여 검색한 내용을 span으로 감싸고 해당 h5에 새롭게 넣는다.
                const newh5 = $('.col-sm-3 h5').eq(i).text().replace(productName,'<span style="background : yellow">'+productName+'</span>')
                $('.col-sm-3 h5').eq(i).html(newh5);
                searchData.push(`<div class='col-sm-3'>${$('.col-sm-3').eq(i).html()}</div>`);
            }
        }

        //seacrchData에 담겨져 있는 상품들만 보여주게 함
        $('.row').html('');
        for(let i =0; i<searchData.length; i++){
            $('.row').append(searchData[i]);
        }

    }else{
        $('.row').html('');
        $.get('/동현/jsonFile/store.json').done(function(data){
            let newdata = data.products
            showData(newdata);
          })
        console.log('Data is null!!');
    }

}