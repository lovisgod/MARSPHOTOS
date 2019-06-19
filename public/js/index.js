document.getElementById('find-photo').addEventListener('click', function() {
    const sol = document.getElementById('sol').value;
    const cam = document.getElementById('cam');
    // let strUser = cam.options[e.selectedIndex].value;
    // let selectedCam = cam.options[cam.selectedIndex].value;
    let selectedCam = cam.value;
    if(sol ===''){
        alert(`SOL can't be empty`)
        return;
    };
    if (selectedCam === ''){
        alert(`CAM field can't be empty`)
        return;
    };
    const listOptions = {
        method:'GET',
    };
    fetch(`https://marsphoto.herokuapp.com/api/v1/get-mars?cam=${selectedCam}&sol=${sol}`, listOptions)
    .then((res) => res.json())
    .then((datas) => {
        if (datas.datas.length === 0){alert('No Image Available')};
        let layout = '';
        datas.datas.forEach(data => {
            console.table(data);
            const row = `<div class="col-md-3">
                   <a id="${data.id}" class="photo-img" ><img src="${data.img_src}"></a>
                     <div class="product-bottom text-center">
                         <i class="fa fa-star"></i>
                         <i class="fa fa-star"></i>
                         <i class="fa fa-star"></i>
                         <i class="fa fa-star"></i>
                         <i class="fa fa-star-half-o"></i>
                         <h3>${data.camera.full_name}</h3>
                     </div>
                  </div>`;
                  layout += row;
            
        });
        document.getElementById('photos').innerHTML = layout;
       
    });
});