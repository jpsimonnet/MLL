<?php
if (!isset($GLOBALS['z_blocs']))
	$GLOBALS['z_blocs'] = array('content','aside','extra','head','head_js','header','footer','breadcrumb');

define('_ZENGARDEN_FILTRE_THEMES','spipr');
define('_ALBUMS_INSERT_HEAD_CSS',false);

if (
	defined('_SPIPR_AUTH_DEMO')?
		_SPIPR_AUTH_DEMO
		:
		(isset($GLOBALS['visiteur_session']['statut'])
    AND $GLOBALS['visiteur_session']['statut']=='0minirezo'
    AND $GLOBALS['visiteur_session']['webmestre']=='oui')
	)
	_chemin(_DIR_PLUGIN_SPIPR_DIST."demo/");

?>