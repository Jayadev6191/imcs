<?php
/**
 * @file
 * vikram_document.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function vikram_document_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_terms|node|document|form';
  $field_group->group_name = 'group_terms';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'document';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Taxonomy Terms',
    'weight' => '10',
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
  $export['group_terms|node|document|form'] = $field_group;

  return $export;
}
