<?php

class ProjectMigration extends ExampleNodeMigration 
{
	public function __construct(array $arguments) 
	{

	    parent::__construct($arguments);
	
		$this->addFieldMapping('field_client', 'field_client_reference');
		
		$this->addFieldMapping('field_image', 'field_gallery')
	         ->sourceMigration('Files');
		$this->addFieldMapping('field_image:file_class')
		     ->defaultValue('MigrateFileUri');
		$this->addFieldMapping('field_image:language')
		     ->defaultValue('und');
		$this->addFieldMapping('field_image:destination_dir')
		     ->defaultValue('projects');
		$this->addFieldMapping('field_image:destination_file')
		     ->defaultValue('');
		$this->addFieldMapping('field_image:file_replace')
		     ->defaultValue('FILE_EXISTS_RENAME');
		$this->addFieldMapping('field_image:preserve_files')
		     ->defaultValue(TRUE);
		$this->addFieldMapping('field_image:source_dir')
		     ->defaultValue('sites/patrick-segarel.com/files');
		$this->addFieldMapping(NULL, 'field_gallery:list')
			->description('DNM');
		$this->addFieldMapping(NULL, 'field_gallery:data')
			->description('DNM');
		$this->addFieldMapping('field_image:alt')
			->description('DNM');
		$this->addFieldMapping('field_image:title')
			->description('DNM');
	 }
}