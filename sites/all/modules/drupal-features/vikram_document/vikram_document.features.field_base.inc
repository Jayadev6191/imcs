<?php
/**
 * @file
 * vikram_document.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function vikram_document_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_document_asset_type'
  $field_bases['field_document_asset_type'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_document_asset_type',
    'foreign keys' => array(),
    'indexes' => array(
      'value' => array(
        0 => 'value',
      ),
    ),
    'locked' => 0,
    'module' => 'list',
    'settings' => array(
      'allowed_values' => array(
        'Case Study' => 'Case Study',
        'Executive Brief' => 'Executive Brief',
        'Reviewer\'s Guide' => 'Reviewer\'s Guide',
        'Solution Brief' => 'Solution Brief',
        'White Paper' => 'White Paper',
      ),
      'allowed_values_function' => '',
    ),
    'translatable' => 0,
    'type' => 'list_text',
  );

  return $field_bases;
}
