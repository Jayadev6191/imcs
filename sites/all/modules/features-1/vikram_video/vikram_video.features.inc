<?php
/**
 * @file
 * vikram_video.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function vikram_video_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function vikram_video_node_info() {
  $items = array(
    'video' => array(
      'name' => t('Video'),
      'base' => 'node_content',
      'description' => t('Approved by Mahesh'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'webcast' => array(
      'name' => t('Webcast'),
      'base' => 'node_content',
      'description' => t('Approved by Mahesh'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'you_tube' => array(
      'name' => t('You Tube'),
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
