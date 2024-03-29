<?php
/**
 * @file
 * vikram_video.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function vikram_video_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_terms|node|video|form';
  $field_group->group_name = 'group_terms';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'video';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Taxonomy Terms',
    'weight' => '49',
    'children' => array(
      0 => 'field_area_of_interest',
      1 => 'field_buyers_journey',
      2 => 'field_ibm_solutions',
      3 => 'field_roles',
      4 => 'field_tags',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-terms field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_terms|node|video|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_terms|node|webcast|form';
  $field_group->group_name = 'group_terms';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'webcast';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Taxonomy Terms',
    'weight' => '48',
    'children' => array(
      0 => 'field_area_of_interest',
      1 => 'field_buyers_journey',
      2 => 'field_ibm_solutions',
      3 => 'field_roles',
      4 => 'field_tags',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_terms|node|webcast|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_terms|node|you_tube|form';
  $field_group->group_name = 'group_terms';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'you_tube';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Taxonomy Terms',
    'weight' => '48',
    'children' => array(
      0 => 'field_area_of_interest',
      1 => 'field_buyers_journey',
      2 => 'field_ibm_solutions',
      3 => 'field_tags',
      4 => 'field_roles',
    ),
    'format_type' => 'tab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-terms field-group-tab',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_terms|node|you_tube|form'] = $field_group;

  return $export;
}
