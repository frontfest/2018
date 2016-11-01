<?php
/**********************************************************************
Theme Name: Eventz Html Theme
Version: 1.0.0
Author: Themeboxr Team
Email: info@themeboxr.com
Website: http://themeboxr.com
Copyright: All rights reserved by themeboxr.com
 **********************************************************************/

$save_in_csv   = true;
$send_email    = false;
$api_key       = null;
$list_id       = null;
$ajax_response = array(
	'success' => false,
	'message' => 'Email is not valid.',
);

function is_already_subscribe($email)
{
	if (is_file('subscribe.csv'))
	{
		$fp = fopen('subscribe.csv', 'r');
		while (!feof($fp))
		{
			$subscribe_list = fgetcsv($fp);
			if ($subscribe_list[0] == $email)
			{
				fclose($fp);

				return true;
			}
		}
		fclose($fp);

		return false;
	}

	return false;
}

if ($_POST['email'])
{
	$email = strtolower($_POST['email']);

	if ($email != null and filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		$ajax_response = array(
			'success' => true,
			'message' => 'Thanks for subscribe.',
		);
		if ($save_in_csv and !is_already_subscribe($email))
		{
			$fp   = fopen('subscribe.csv', 'a');
			$list = array($email);
			fputcsv($fp, $list);
			fclose($fp);
		}

		if ($send_email && $api_key != null && $list_id != null)
		{

			require_once('Mailchimp.php');
			$lz_mailchimp = new Mailchimp($api_key);
			try
			{
				$subscriber = $lz_mailchimp->lists->subscribe($list_id, array('email' => htmlentities($_POST['email'])));
				if (empty($subscriber['euid']) || empty($subscriber['leid']))
				{
					throw new Exception('Subscription is not available now.');
				}
			}
			catch (Exception $Exp)
			{
				$ajax_response = array(
					'success' => false,
					'message' => $Exp->getMessage()
				);
			}
		}
		echo json_encode($ajax_response);
	}
	else
	{
		echo json_encode($ajax_response);
	}
}