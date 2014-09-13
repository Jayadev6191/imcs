<?php
/**
 * @file
 * vikram_web_link.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function vikram_web_link_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function vikram_web_link_image_default_styles() {
  $styles = array();

  // Exported image style: on24_thumb_large.
  $styles['on24_thumb_large'] = array(
    'name' => 'on24_thumb_large',
    'label' => 'on24ThumbLarge',
    'effects' => array(
      1 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 48,
          'height' => 140,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: on24_thumb_small.
  $styles['on24_thumb_small'] = array(
    'name' => 'on24_thumb_small',
    'label' => 'on24ThumbSmall',
    'effects' => array(
      2 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 32,
          'height' => 32,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function vikram_web_link_node_info() {
  $items = array(
    'web_link' => array(
      'name' => t('Web Link'),
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
