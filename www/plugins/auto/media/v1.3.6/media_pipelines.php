<?php
if (!defined("_ECRIRE_INC_VERSION")) return;

function media_affiche_milieu($flux){
	
	if ($flux['args']['exec']=='configurer_avancees'){
		$flux['data'] .= recuperer_fond('prive/configurer/media',array());
	}

	return $flux;
}

function media_configurer_liste_metas($metas){
	$metas['media_taille_icone_largeur'] = 52;
	$metas['media_taille_icone_hauteur'] = 52;
	$metas['media_taille_petit_largeur'] = 120;
	$metas['media_taille_petit_hauteur'] = 90;
	$metas['media_taille_moyen_largeur'] = 320;
	$metas['media_taille_moyen_hauteur'] = 240;
	$metas['media_taille_grand_largeur'] = 640;
	$metas['media_taille_grand_hauteur'] = 480;
	$metas['media_largeur_min_legende'] = 120;
	$metas['media_largeur_max_legende'] = 350;
	return $metas;
}

function media_insert_head_css($flux){
	$flux .= '<link rel="stylesheet" href="'.find_in_path('css/media.css').'" type="text/css" media="all" />';
	return $flux;
}

function media_header_prive($flux){
	$flux = media_insert_head_css($flux); // en b�n�ficier aussi dans l'espace priv�
	return $flux;
}

function media_ieconfig_metas($table){
	$table['media']['titre'] = _T('media:modeles_media');
	$table['media']['icone'] = 'document-16.png';
	$table['media']['metas_brutes'] = 'media_taille_icone_largeur,media_taille_icone_hauteur,media_taille_petit_largeur,media_taille_petit_hauteur,media_taille_moyen_largeur,media_taille_moyen_hauteur,media_taille_grand_largeur,media_taille_grand_hauteur,media_largeur_min_legende,media_largeur_max_legende';
	return $table;
}

// Utilisation du pipeline pre_liens pour traiter les raccourcis ->media12
function media_pre_liens($texte) {
	$texte = preg_replace('/->media([0-9]+)\]/Ui','->doc$1]', $texte);
	return $texte;
}

// Ajouter le mod�le media � la liste des mod�les de documents
function media_declarer_tables_objets_sql($tables){
	$tables['spip_documents']['modeles'][] = 'media';
	return $tables;
}


?>