<?php
class Player_model extends CI_Model {
	
	public function __construct() {
		$this->load->database();
	}
	
	public function get_player_list() {
		$this->db->order_by("score", "desc");
		$query = $this->db->get('player'); 
		return $query->result_array();
	}
	
	public function create_player() {

	    $data = array(
        	'name' => $this->input->post('name'),
        	'score' => $this->input->post('score')
	    );

	    return $this->db->insert('player', $data);
	}
}
