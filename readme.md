# Homepage template

This repository contains the HTML template and CSS for the homepage. The various content areas on the homepage are populated via the CMS.

The _example-snippets_ folder contains examples for each of the feature areas, matching the markup that is output by the CMS.

Grunt is used to assemble files and upload them to the web.

### Deploying template updates

Running ``grunt live`` publishes a copy of the template, which is used in the homepage-deploy task.

Specifically, it does the following:

* Downloads the current version of the global stylesheet from Github
* Minifies all CSS and adds a hash to the CSS filenames
* Assembles a version of the homepage containing the content of the example snippets and uploads it to [http://www.york.ac.uk/np/index_example.shtml](http://www.york.ac.uk/np/index_example.shtml)
* Uploads the template to [http://www.york.ac.uk/np/index_template_live.shtml](http://www.york.ac.uk/np/index_template_live.shtml)
* Uploads the CSS to [http://www.york.ac.uk/np/css/](http://www.york.ac.uk/np/css/)

Running ``grunt test`` will do all of the above apart from updating the template, allowing design changes to be tested.


### FTP details
FTP details aren't included in this repository. 

To add them, create a file called .ftppass, paste in the code below and replace the username and password values.

	{  
		"key1": {  
  			"username": "USERNAME",  
  			"password": "PASSWORD"  
  		}  
  	}
