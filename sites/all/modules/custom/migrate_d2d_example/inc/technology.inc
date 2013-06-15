<?php

class TechnologyMigration extends ExampleNodeMigration 
{
	public function __construct(array $arguments) 
	{

	    parent::__construct($arguments);
		
		$this->addFieldMapping('field_link', 'field_external_link');
		$this->addFieldMapping( NULL, 'field_external_link:title')
			->description('DNM');
		$this->addFieldMapping( NULL, 'field_external_link:attributes')
			->description('DNM');
		
		$this->addFieldMapping('field_logo', 'field_logo')
	         ->sourceMigration('Files');
		$this->addFieldMapping('field_logo:file_class')
		     ->defaultValue('MigrateFileUri');
		$this->addFieldMapping('field_logo:language')
		     ->defaultValue('und');
		$this->addFieldMapping('field_logo:destination_dir')
		     ->defaultValue('logos');
		$this->addFieldMapping('field_logo:destination_file')
		     ->defaultValue('');
		$this->addFieldMapping('field_logo:file_replace')
		     ->defaultValue('FILE_EXISTS_RENAME');
		$this->addFieldMapping('field_logo:preserve_files')
		     ->defaultValue(TRUE);
		$this->addFieldMapping('field_logo:source_dir')
		     ->defaultValue('sites/patrick-segarel.com/files');
		$this->addFieldMapping(NULL, 'field_logo:list')
			->description('DNM');
		$this->addFieldMapping(NULL, 'field_logo:data')
			->description('DNM');
		$this->addFieldMapping('field_logo:alt')
			->description('DNM');
		$this->addFieldMapping('field_logo:title')
			->description('DNM');
	 }
}