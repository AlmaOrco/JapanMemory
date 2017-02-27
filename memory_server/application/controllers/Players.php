<?php
class players extends CI_Controller {
	public function __construct() {
		parent::__construct();
		$this->load->model('player_model');
		$this->load->helper('url_helper');
	}

	public function index() {
		$data['players'] = $this->player_model->get_player_list();

		$this->load->view('player/index', $data);
	}

	public function create() {
	    $this->load->helper('form');
	    $this->load->library('form_validation');

	    $data['title'] = 'Create a player item';
	    $data['message'] = 'Introduce una carta';

	    $this->form_validation->set_rules('name', 'name', 'required');
	    $this->form_validation->set_rules('score', 'score', 'required');

	    if ($this->form_validation->run() === FALSE) {
	        $data['message'] = 'Error: fallo en la inserción de datos.';
        	$this->load->view('player/create',$data);
	    } else {
	    	$this->player_model->create_player();
			$data['players'] = $this->player_model->get_player_list();

        	$this->load->view('player/index',$data);
	    }
	}
}
