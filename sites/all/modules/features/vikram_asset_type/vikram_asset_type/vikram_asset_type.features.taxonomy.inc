<?php
/**
 * @file
 * vikram_asset_type.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function vikram_asset_type_taxonomy_default_vocabularies() {
  return array(
    'asset_type' => array(
      'name' => 'Asset Type',
      'machine_name' => 'asset_type',
      'description' => 'Asset type that are linked to the Content type',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}
