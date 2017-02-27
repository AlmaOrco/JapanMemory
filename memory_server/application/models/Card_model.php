<?php
class Card_model extends CI_Model {
	
	public function __construct() {
		$this->load->database();
	}
	
	public function get_card_list() {
		$query = $this->db->get('card');
		return $query->result_array();
	}
	
	public function create_card() {

	    $data = array(
        	'name' => $this->input->post('name'),
        	'image' => $this->input->post('image'),
        	'description' => $this->input->post('description')
	    );

	    return $this->db->insert('card', $data);
	}
}
