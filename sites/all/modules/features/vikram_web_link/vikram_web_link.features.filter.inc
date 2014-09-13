<?php
/**
 * @file
 * vikram_web_link.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function vikram_web_link_filter_default_formats() {
  $formats = array();

  // Exported format: on24-unfiltered.
  $formats['on24_unfiltered'] = array(
    'format' => 'on24_unfiltered',
    'name' => 'on24-unfiltered',
    'cache' => 1,
    'status' => 1,
    'weight' => 0,
    'filters' => array(),
  );

  return $formats;
}
