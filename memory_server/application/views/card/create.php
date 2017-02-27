<h2><?php echo $message; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('cards/create'); ?>

    <label for="name">Name</label>
    <input type="input" name="name" /><br />

    <label for="image">image</label>
    <input type="input" name="image" /><br />

    <label for="description">description</label>
    <textarea name="description"></textarea><br />

    <input type="submit" name="submit" value="Guardar carta" />

</form>
