File structure for FoodDashBoard Project:

/cleandata - Folder for cleaned and test datasets in .csv format.

/notebook - Jupyter notebook files (Python) used in the data scraping, import, cleaning, and engineering process.
	/notebook/1_data_cleanup.ipynb
	/notebook/2_data_engineering.ipynb
	/notebook/3_testing_grounds.ipynb

/rawdata - Folder for raw data import and subset of said data prior to cleaning/engineering and API

/scripts - Custom Javascript and CSS stylesheets for D3/.js visualizations (references the /scripts_dependency folder.)

/static - Required for Flask static file reference (i.e. CSS for specific resources) + Required library and source files for D3/.js visualizations.

/sqldata/clean_complete_dataset.db - Final dataset in SQLite database format.

/templates - HTML structure for dashboard deployment including individual pages. 

app.py - Python + Flask for localized dashboard deployment. 