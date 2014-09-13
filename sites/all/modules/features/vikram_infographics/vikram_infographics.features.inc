<?php
/**
 * @file
 * vikram_infographics.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function vikram_infographics_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function vikram_infographics_node_info() {
  $items = array(
    'infographics' => array(
      'name' => t('Infographics'),
      'base' => 'node_content',
      'description' => t('Approved by Mahesh'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
