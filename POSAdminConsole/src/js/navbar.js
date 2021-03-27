function active(id) {
    document.getElementById(id).className= 'active';
}


function inHead(){
    document.write(`<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color">
        <link rel="manifest" href="manifest.json">

    	<link rel="apple-touch-icon" href="icons/logo_100.png">
    	<link rel="icon" type="image/png" href="icons/logo_100.png">
    
    	<!--     Fonts and icons     -->
    	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    	<script src="https://kit.fontawesome.com/553c78d64a.js" crossorigin="anonymous"></script>
    
    	<script type="module"  src="database.js"></script>
    
    	<!-- CSS Files -->
    	<link href="css/bootstrap.min.css" rel="stylesheet" />
    	<link href="css/paper-dashboard.css" rel="stylesheet" />
    	<link href="demo/demo.css" rel="stylesheet" />
    
    <style>
    		@import url("css/font.css");
    
    		.logo a {
    		color: blanchedalmond;
    		font-family: 'Cedarville Cursive' !important;
    		text-transform: lowercase !important;
    		font-size: 3em !important;
    		text-align: center;
    		}
    		.sidebar-wrapper {
    		overflow: hidden !important;
    		}
    		.le {
    			font-family: 'Cedarville Cursive' !important;
    			font-size: 1.5em;
    		}
    
    	</style>
    
    </head>
    
    <body class="">
    	<div class="wrapper ">

            <div class="sidebar" data-color="black" data-active-color="danger">
    		<div class="logo">
    			<div class="logo-image-big" style="justify-content: center; display: flex;">
    				<img src="icons/admin.png">
    			</div>
    			<!-- <p>CT</p> -->
    			<a class="simple-text logo-normal">
    			le mieux
    			</a>
    		</div>
    		<div class="sidebar-wrapper">
    			<ul class="nav">
    			<li id="dash">
    				<a href="dashboard.html">
    				<i class="fas fa-home"></i>
    				<p>Dashboard</p>
    				</a>
    			</li>
    			<li id="icons">
    				<a href="icons.html">
    				<i class="fas fa-receipt"></i>
    				<p>Orders</p>
    				</a>
    			</li>
    			<li id="invent">
    				<a href="inventory.html">
    				<i class="fas fa-box-open"></i>
    				<p>Inventory</p>
    				</a>
    			</li>
    			<li id="customer">
    				<a href="customer.html">
    					<i class="far fa-user-circle"></i>
    					<p>Customers</p>
    				</a>
    			</li>
    			<li id="employee">
    				<a href="employee.html">
    					<i class="nc-icon nc-badge"></i>
    					<!--<i class="far fa-id-card"></i>-->
    					<p>Employees</p>
    				</a>
    			</li>
    			<li id="temp">
    				<a href="tables.html">
    				<i class="nc-icon nc-tile-56"></i>
    				<p>Table List</p>
    				</a>
    			</li>
    			<li>
    				<a href="#">
    				<i class="nc-icon nc-globe"></i>
    				<p>Links</p>
    				</a>
    			</li>
    			<!-- <li class="active-pro">
    				<a href="./upgrade.html">
    				<i class="nc-icon nc-spaceship"></i>
    				<p>Upgrade to PRO</p>
    				</a>
    			</li> -->
    			</ul>
    		</div>
    		</div>
    		<div class="main-panel">
    		<!-- Navbar -->
    		<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
    			<div class="container-fluid">
    			<div class="navbar-wrapper">
    				<div class="navbar-toggle">
    				<button type="button" class="navbar-toggler">
    					<span class="navbar-toggler-bar bar1"></span>
    					<span class="navbar-toggler-bar bar2"></span>
    					<span class="navbar-toggler-bar bar3"></span>
    				</button>
    				</div>
    				<a class="navbar-brand" href="javascript:;">Admin Console</a>
    			</div>
    			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
    				<span class="navbar-toggler-bar navbar-kebab"></span>
    				<span class="navbar-toggler-bar navbar-kebab"></span>
    				<span class="navbar-toggler-bar navbar-kebab"></span>
    			</button>
    			<div class="collapse navbar-collapse justify-content-end" id="navigation">
    				<!-- <form>
    				<div class="input-group no-border">
    					<input type="text" value="" class="form-control" placeholder="Search...">
    					<div class="input-group-append">
    					<div class="input-group-text">
    						<i class="nc-icon nc-zoom-split"></i>
    					</div>
    					</div>
    				</div>
    				</form> -->
    				<ul class="navbar-nav">
    				<li class="nav-item">
    					<a class="nav-link btn-magnify" href="javascript:;">
    					<i class="nc-icon nc-layout-11"></i>
    					<p>
    						<span class="d-lg-none d-md-block">Stats</span>
    					</p>
    					</a>
    				</li>
    				<li class="nav-item btn-rotate dropdown">
    					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    						<i class="fas fa-bell"></i>
    						<p>
    							<span class="d-lg-none d-md-block">Some Actions</span>
    						</p>
    					</a>
    					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
    					<a class="dropdown-item" href="#">Action</a>
    					<a class="dropdown-item" href="#">Another action</a>
    					<a class="dropdown-item" href="#">Something else here</a>
    					</div>
    				</li>
    				<li class="nav-item">
    					<a class="nav-link btn-rotate" href="javascript:vois(0);">
    						<i class="fas fa-cog"></i>
    						<p>
    							<span class="d-lg-none d-md-block">Account</span>
    						</p>
    					</a>
    				</li>
    				</ul>
    			</div>
    			</div>
    		</nav>
    `);
}


function foot(){
    document.write(`<footer class="footer footer-black  footer-white ">
    			<div class="container-fluid">
    			<div class="row">
    				<div class="credits ml-auto">
    				<span class="copyright">
    					<script>
    					document.write(new Date().getFullYear())
    					</script>, <i class="le">le mieux</i> Admin Console
    				</span>
    				</div>
    			</div>
    			</div>
    		</footer>
    		</div>
    	</div>
      <!--   Core JS Files   -->
      <script src="js/core/jquery.min.js"></script>
      <script src="js/core/popper.min.js"></script>
      <script src="js/core/bootstrap.min.js"></script>
      <script src="js/plugins/perfect-scrollbar.jquery.min.js"></script>
      <!-- Chart JS -->
      <script src="js/plugins/chartjs.min.js"></script>
      <!--  Notifications Plugin    -->
      <script src="js/plugins/bootstrap-notify.js"></script>
      <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
      <script src="js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script>
      <script>
        $(document).ready(function() {
          // Javascript method's body can be found in assets/assets-for-demo/js/demo.js
          demo.initChartsPages();
        });
      </script>
    <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('service-worker.js');
            }
        </script>
    
        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="/__/firebase/8.3.1/firebase-app.js"></script>
    
        <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries -->
        <script src="/__/firebase/8.3.1/firebase-analytics.js"></script>
    
        <!-- Initialize Firebase -->
        <script src="/__/firebase/init.js?useEmulator=true"></script>
        <!-- Add Firebase products that you want to use -->
      <script src="/__/firebase/8.3.1/firebase-auth.js"></script>
      <script src="/__/firebase/8.3.1/firebase-firestore.js"></script>

    // </body>
    // 
    // </html>
    `);
}