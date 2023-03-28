let rectangele=document.querySelector('#rectangle')
rectangele.addEventListener('mousedown',function(event){
    console.log('mousedown');
})
rectangele.addEventListener('mouseup',function(event){
    console.log('mouseup');
})
rectangele.addEventListener('mouseenter',function(event){
    console.log('mouseenter');
})
rectangele.addEventListener('mouseleave',function(event){
    console.log('mouseleave');
})
rectangele.addEventListener('mousemove',function(event){
    console.log('mousemove');
})