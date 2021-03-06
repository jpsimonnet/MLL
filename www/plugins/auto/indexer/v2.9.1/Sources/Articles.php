<?php
/**
 * CODE MORT, ne sert plus, tout passe par Sources/SpipDocuments
 */

namespace Spip\Indexer\Sources;

use \Indexer\Sources\Document;

class Articles extends SpipDocuments {
	public function getDocuments($start = 0, $end = 0, $column = 'id_article') {
		$where = array();
		if ($start) $where[] = "$column >= $start";
		if ($end)   $where[] = "$column < $end";

		$all = sql_allfetsel(
			'*',
			'spip_articles',
			$where, // Where
			'', // Gr By
			'', // Or By
			'' // Limit
		);

		$documents = array();
		foreach ($all as $article) {
			$documents[] = $this->createDocumentArticle($article);
		}
		
		return $documents;
	}

	public function createDocumentArticle($article) {
		include_spip('inc/filtres');
		$id = $article['id_article'];

		$doc = new Document(array(
			'id'           => $this->getObjectId('article', $id),
			'title'        => supprimer_numero($article['titre']),
			'summary'      => $article['surtitre'] . $article['soustitre'] . $article['chapo'],
			'content'      => $article['texte'],
			'date'         => (substr($article['date_redac'],0,4) == '0000') ? $article['date'] : $article['date_redac'],
			'uri'          => generer_url_entite_absolue($id, 'article'),
			'properties'   => array(
				'authors'  => $this->getAuthorsProperties('article', $id),
				'tags'     => $this->getTagsProperties('article', $id),
				'objet'    => 'article',
				'id_objet' => $id,
				'lang'     => $article['lang']
			)
		));
		
		$doc = pipeline(
			'indexer_document',
			array(
				'args' => array(
					'objet ' => 'article',
					'id_objet' => $id,
					'champs' => $article,
				),
				'data' => $doc,
			)
		);
		
		return $doc;
	}

	public function getBounds($column = '') {
		return $bornes = sql_fetsel(array('MIN(id_article) AS min', 'MAX(id_article) AS max'), 'spip_articles');
	}
}
