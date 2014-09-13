<?php
/**
 * @file
 * imcs_feeds_for_vocabulary_terms.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function imcs_feeds_for_vocabulary_terms_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "feeds" && $api == "feeds_importer_default") {
    return array("version" => "1");
  }
}
