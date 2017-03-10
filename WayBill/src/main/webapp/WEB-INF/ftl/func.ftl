<!DOCTYPE html>
<html>
    <head>
        <!-- Http Header Infomation -->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="Content-Language" content="zh-cn" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Cache" content="no-cache">
        <meta name="author" content="fxstudio.com.cn" />
        <meta name="description" content="fx-tech.cn" />
        <meta name="keywords" content="fx-tech.cn,Management,FXStudio"/>
        <meta name="Copyright" content="Copyright fx-tech.cn All Rights Reserved."/>

        <title>FreeWay WebSite</title>
        
        <!-- WebPage Style Desc -->
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="javascript/extjs/resources/css/ext-all-neptune.css" />
        <link rel="stylesheet" href="javascript/extjs/ux/css/ItemSelector.css" />
        <link rel="stylesheet" href="styles/style.css" />
    </head>

    <body>
        <#if model["hasApplet"]??>
            <APPLET ID="JrPrt" name = "app" codebase="weblibs" CODE = "JdApplet"  
        	        ARCHIVE = "jasperreports-5.0.1.jar,commons-logging-1.0.4.jar,log4j-1.2.14.jar,barbecue-1.5-beta1.jar,commons-collections-3.2.1.jar,commons-digester-2.1.jar"
        	        WIDTH = "0" HEIGHT = "0" MAYSCRIPT>
                <PARAM NAME = "type" VALUE="application/x-java-applet;version=1.2.2"/>
                <PARAM NAME = "scriptable" VALUE="true"/>
            </APPLET>
        </#if>
    
        <!-- Load Javascript lib -->
        <script src="javascript/extjs/ext-all.js"></script>
        <script src="javascript/extjs/locale/ext-lang-zh_CN.js"></script>
        <script src="javascript/config/environment.js"></script>
	    <script src="javascript/plugins/md5.js"></script>
        
        <#if model["modelName"]??>
            <script src="javascript/modules/${model["modelName"]}/app.js"></script>
        </#if>
    </body>
</html>
