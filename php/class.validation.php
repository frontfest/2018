<?php

	class Validation {

		private $valid = true;
		private $post = array();
		private $required = false;
		private $trim = false;
		private $field_name = '';
		private $field_value = '';
		private $error_collection = array(
			'validation' => true,
			'error_list' => array()
		);

		public function __construct() {
			foreach ($_POST as $key => $value) {
				$this->post[$key] = $value;
			}
		}

		public function get_value($key) {
			return $this->post[$key];
		}

		public function _init() {			
			$this->valid = true;
			$this->required = false;
			$this->trim = false;
			$this->field_name = '';
			$this->field_value = '';
		}

		public function validation_info() {
			return $this->error_collection;
		}

		public function set_error($key_name, $msg) {
			$this->error_collection['validation'] = false;
			$this->error_collection['error_list'][$key_name] = $msg;
			return false;
		}

		public function alpha($str) {
			if ($this->required($str)) {
				return (ctype_alpha($this->field_value)) ? true : $this->set_error($this->field_name, 'This field allowed only alphabetic charecter');
			} else {
				return false;
			}
		}

		public function alpha_numeric_spaces($str) {
			if ($this->required($str)) {
				return ((bool) preg_match('/^[A-Z0-9 ]+$/i', $this->field_value)) ? true : $this->set_error($this->field_name, 'This field allowed only alphabetic charecter and spaces');
			} else {
				return false;
			}
		}

		public function alpha_spaces($str) {
			if ($this->required($str)) {
				return ((bool) preg_match('/^[A-Z ]+$/i', $this->field_value)) ? true : $this->set_error($this->field_name, 'This field allowed only alphabetic charecter and spaces');
			} else {
				return false;
			}
		}

		public function alpha_numeric($str) {
			if ($this->required($str)) {
				return (ctype_alnum((string) $this->field_value)) ? true : $this->set_error($this->field_name, 'This field allowed only alpha numeric charecter');
			} else {
				return false;
			}
		}

		public function numeric($str) {
			if ( $this->required( $str ) && !empty( $str ) ) {
				return (bool) preg_match('/^[\-+]?[0-9]*\.?[0-9]+$/', $this->field_value) ? true : $this->set_error($this->field_name, 'This field allowed numbers only');
			} else {
				return false;
			}
		}

		public function strip_html_tags($str) {

		}

        public function strip_js_tags($str) {

        }

		public function strip_php_tag($str) {

		}

		public function clean_xss($str) {
			
		}

		public function email($str) {
			if ( $this->required( $str ) ) {
				if (function_exists('idn_to_ascii') && $atpos = strpos($this->field_value, '@')) {
					$this->field_value = substr($this->field_value, 0, ++$atpos).idn_to_ascii(substr($this->field_value, $atpos));
				}
				return (filter_var($this->field_value, FILTER_VALIDATE_EMAIL)) ? true : $this->set_error($this->field_name, 'Email is not valid');
			} else {
				return false;
			}
		}

		public function required($str) {
			if ($this->required) {
				$this->required = false;
				if ($this->trim) {
					$this->trim = false;
					$this->filed_value = trim($str);
				}

				if (empty($this->field_name)) {
					return $this->set_error($this->field_name, 'This field is required');
				}
				return true;
			}
			return true;
		}

		public function validate($key_name, $rules_str) {
			$this->_init();
			$this->field_name = $key_name;
			$this->field_value = $this->post[$key_name];
			$rules = explode('|', $rules_str);
			$this->trim = (in_array('trim', $rules)) ? true : false;
			$this->required = (in_array('required', $rules)) ? true : false;

			foreach ($rules as $rule) {
				if (method_exists($this, $rule)) {
					if (!call_user_func(array($this, $rule), $this->field_value)) {
						break;
					}
				}
			}
		}
	}