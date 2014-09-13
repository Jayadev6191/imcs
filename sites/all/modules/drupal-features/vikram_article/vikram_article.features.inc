<?php
/**
 * @file
 * vikram_article.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function vikram_article_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function vikram_article_node_info() {
  $items = array(
    'asset' => array(
      'name' => t('Article'),
      'base' => 'node_content',
      'description' => t('Renamed from \'Asset\''),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
