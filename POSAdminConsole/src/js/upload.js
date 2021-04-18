var id=""

    

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "http://localhost:5500/cshik/upload.html" // replace with your redirect_uri;
    const client_secret = "Bx8MwGHNsjKlqTg_FV52exqk"; // replace with your client secret
    const scope = "https://www.googleapis.com/auth/drive";
    var access_token= "";
    var refresh_token="1//0gLXO5bFxcdSfCgYIARAAGBASNwF-L9IrLF8Egv6OGmHGRPaKbKKjx6WvV6hlybwX5Zi0RPleKs6Ign8d6GNE6jxxRJemR8wNVB0";
    var client_id = "392020718713-p2lk0sb95kqc4e4rheonon7d7eqa6254.apps.googleusercontent.com"// replace it with your client id;
   var pdocId="1YfQpuljYgeicw9n5TYqpPG09bvuwh5Wp"
   var cdocId="1Kt21l6edZho0oxm2tkzml-lD0831bYmF"
    var u="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope="+scope+""
    console.log(u)
function getToken() {
    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        
        data: {
            // code:code,
            // redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        refresh_token:refresh_token,
        grant_type:"refresh_token"},
        dataType: "json",
        success: function(resultData) {
           
            console.log("accessToken",resultData.access_token)
            console.log("refreshToken",resultData.token_type)
            console.log("expires_in",resultData.expires_in)
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.token_type);
           localStorage.setItem("expires_in",resultData.expires_in);
        //    window.history.pushState({}, document.title, "/cshik/" + "upload.html");
           
           
           
           
        }
  });
}
   
   
//    $.ajax({
//         type: 'POST',
//         url: "https://www.googleapis.com/oauth2/v4/token",
//         data: {
//             code:code,
//             redirect_uri:redirect_uri,
//             client_secret:client_secret,
//         client_id:client_id,
//         scope:scope,
//         
//         grant_type:"authorization_code"},
//         dataType: "json",
//         success: function(resultData) {
           
//             console.log("accessToken",resultData.access_token)
//             console.log("refreshToken",resultData.refresh_token)
//             console.log("expires_in",resultData.expires_in)
//            localStorage.setItem("accessToken",resultData.access_token);
//            localStorage.setItem("refreshToken",resultData.refreshToken);
//            localStorage.setItem("expires_in",resultData.expires_in);
//            window.history.pushState({}, document.title, "/cshik/" + "upload.html");
           
           
           
           
//         }
//   });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   

    var Upload = function (file) {
        this.file = file;
    };
    
    Upload.prototype.getType = function() {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };
    Upload.prototype.getSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };
    Upload.prototype.getName = function() {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () {
        var that = this;
        
        var formData = new FormData();

        // // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
       
        //    formData.append("uploadType","multipart")
        //    console.log(formData1.get("file"))
        //    var formData={
        //        file:formData1.get("file"),
        //        "parents":[{
                
        //         "id": "1YJTv0VUjRnjB1VcYDx3OUpAyOcO46R-n",
               
        //        }],
               
        //    }
        
        // console.log(formData)
        
        $.ajax({
            type: "POST",
            async:false,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
                id=data.id;
            },
            error: function (error) {
                console.log(error);
            },
            // async: true,
            data: formData,
            
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
        console.log(id)
        var nfd= new FormData();
        nfd.append("title",id)
        $.ajax({
            type: "PUT",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            // headers:{ 
            //     "Content-Type": "application/json"
            // },
            url: "https://www.googleapis.com/drive/v2/files/"+id+"?uploadType=multipart&addParents=1Kt21l6edZho0oxm2tkzml-lD0831bYmF",
            // data:JSON.stringify({
            //     "title":id
            // }),
            // xhr: function () {
            //     var myXhr = $.ajaxSettings.xhr();
            //     if (myXhr.upload) {
            //         myXhr.upload.addEventListener('progress', that.progressHandling, false);
            //     }
            //     return myXhr;
            // },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            // data: formData,
            
            cache: false,
            // contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    Upload.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#progress-wrp";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new Upload(file);
    
        // maby check size or type here with upload.getSize() and upload.getType()
    
        // execute upload
        upload.doUpload();
    });


    // $(".deleteBtn").on("click",function(){
        
    //     $.ajax({
    //         type: "DELETE",
    //         beforeSend: function(request) {
    //             request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
    //         },
    //         // headers:{ 
    //         //     "Content-Type": "application/json"
    //         // },
    //         url: "https://www.googleapis.com/drive/v2/files/"+id,
    //         // data:JSON.stringify({
    //         //     "title":id
    //         // }),
    //         // xhr: function () {
    //         //     var myXhr = $.ajaxSettings.xhr();
    //         //     if (myXhr.upload) {
    //         //         myXhr.upload.addEventListener('progress', that.progressHandling, false);
    //         //     }
    //         //     return myXhr;
    //         // },
    //         success: function (data) {
    //             console.log(data);
    //         },
    //         error: function (error) {
    //             console.log(error);
    //         },
    //         async: true,
    //         // data: formData,
            
    //         cache: false,
    //         // contentType: false,
    //         processData: false,
    //         timeout: 60000
    //     });
    // })


    

