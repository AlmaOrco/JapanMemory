<?php
class Cards extends CI_Controller {
	public function __construct() {
		parent::__construct();
		$this->load->model('card_model');
		$this->load->helper('url_helper');
	}

	public function index() {
		$data['cards'] = $this->card_model->get_card_list();

		$this->load->view('card/index', $data);
	}

	public function create() {
	    $this->load->helper('form');
	    $this->load->library('form_validation');

	    $data['title'] = 'Create a card item';
	    $data['message'] = 'Introduce una carta';

	    $this->form_validation->set_rules('name', 'name', 'required');
	    $this->form_validation->set_rules('image', 'image', 'required');
	    $this->form_validation->set_rules('description', 'description', 'required');

	    if ($this->form_validation->run() === FALSE) {
        	$this->load->view('card/create',$data);
	    } else {
	        $this->card_model->create_card();
	        $data['message'] = 'Carta guardada correctamente';
        	$this->load->view('card/create', $data);
	    }
	}
}
