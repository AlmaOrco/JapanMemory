<h2><?php echo $message; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('players/create'); ?>

    <label for="name">Name</label>
    <input type="input" name="name" /><br />

    <label for="score">score</label>
    <input type="input" name="score" /><br />

    <input type="submit" name="submit" value="Guardar player" />

</form>
